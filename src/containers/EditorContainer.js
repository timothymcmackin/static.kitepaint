import React from "react";
import PropTypes from "prop-types";
import { fromJS, Iterable } from "immutable";
import { connect } from "react-redux";
import { CREATE_DESIGN, UPDATE_DESIGN } from "../redux/actions";
import designShape from "../models/design";
import productShape from "../models/product";
import Status from "../models/status";
import { isEmbedded, defaultBackground } from "../constants/embed";
import ErrorPage from "../components/ErrorPage";
import { softCompareStrings, makeCancelable, embedAllowed } from "../utils";

const appliedColorsShape = PropTypes.objectOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  })
);

const productAppliedColorsShape = PropTypes.objectOf(appliedColorsShape);

export { appliedColorsShape, productAppliedColorsShape };

/**
 * Parses the variations from the provided design in order to determine what colors have been
 * applied.
 * @param {Design} design A design to parse the colors from
 * @param {Product} product The product that the design belongs to
 * @return {Object}
 */
export function generateAppliedColors(design, product) {
  if (!design || !product) {
    return {};
  }
  const colors = product.colors;
  return design.variations.reduce((accumulated, variation) => {
    const { svg, name } = variation;
    const render = new window.DOMParser().parseFromString(svg, "text/xml");
    const panels = render.querySelectorAll("[data-id]");
    const appliedColors = {};
    for (let i = 0; i < panels.length; i++) {
      const panel = panels[i];
      const color = panel.getAttribute("fill");
      if (color) {
        const colorMatch = colors.find(storedColor =>
          softCompareStrings(storedColor.color, color)
        );
        const colorName = colorMatch ? colorMatch.name : color;
        appliedColors[panel.getAttribute("data-id")] = {
          color,
          name: colorName
        };
      }
    }

    accumulated[name] = appliedColors;
    return accumulated;
  }, {});
}

/**
 * Manages the overall state of the editor. And provides a means to save changes.
 */
export class EditorContainer extends React.Component {
  static propTypes = {
    /**
     * The product being edited
     */
    product: productShape.isRequired,
    /**
     * The default color (name) to be selected. Will default to the first color on the product
     * otherwise.
     */
    defaultColor: PropTypes.string,
    /**
     * An existing design being edited.
     */
    design: designShape,
    /**
     * The default variation (name) to be selected. Will default to the first variation on the
     * product otherwise.
     */
    defaultVariation: PropTypes.string,
    /**
     * A function that renders content
     */
    children: PropTypes.func.isRequired,
    /**
     * A function called when we want to save the design. Provided by Redux.
     */
    onSave: PropTypes.func.isRequired,
    /**
     * A function called when we want to update a design. Provided by Redux.
     */
    onUpdate: PropTypes.func.isRequired
  };

  constructor(props, ...rest) {
    super(props, ...rest);

    // Use the first color, or the one specified
    let currentColor = props.product.colors[0];
    if (props.defaultColor) {
      currentColor = props.product.colors.find(color =>
        softCompareStrings(color.name, props.defaultColor)
      );
    }

    // Use the primary variation or the one specified
    let currentVariation = props.product.variations[0];
    if (props.design) {
      currentVariation = props.design.variations.find(
        variation => variation.primary
      );
    }
    if (props.defaultVariation) {
      currentVariation = props.product.variations.find(variation =>
        softCompareStrings(variation.name, props.defaultVariation)
      );
    }

    const appliedColors = generateAppliedColors(
      this.props.design,
      this.props.product
    );

    this.state = {
      background: defaultBackground || null,
      hideOutlines: false,
      /**
       * The currently selected color.
       * @type {Object}
       */
      currentColor,
      /**
       * The currently selected variation.
       * @type {Object}
       */
      currentVariation,
      /**
       * The currently applied colors.
       * Example
       * {
       *   "my-variation": {
       *     p1: {
       *       name: "black",
       *       color: "#000"
       *     }
       *   }
       * }
       * @type {Object}
       */
      appliedColors,
      appliedColorsHistory: [],
      undoDepth: 0
    };
  }

  /**
   * Apply colors to the state and keep a record of the change in history.
   * @param  {String[]} keys The series of keys that point to the value to
   * change. Is provided to Immutable's setIn. If the array is empty, the value
   * will be used to overwrite the entire appliedColors value.
   * @param  {*} value The new value to set
   * @private
   */
  _applyColors(keys, value) {
    const MAX_HISTORY_LENGTH = 20;

    // Determine the new value for appliedColors, and the current specific
    // value that is being changed
    let appliedColors;
    let previousValue;
    if (!keys.length) {
      // If we have no keys, we are replacing the entire appliedColors object
      appliedColors = value;
      previousValue = this.state.appliedColors;
    } else {
      const currentAppliedColors = fromJS(this.state.appliedColors);
      appliedColors = currentAppliedColors.setIn(keys, value).toJS();
      if (currentAppliedColors.hasIn(keys)) {
        previousValue = currentAppliedColors.getIn(keys, value);
      }

      // If the previousValue is immutable, convert it to JS.
      if (Iterable.isIterable(previousValue)) {
        previousValue = previousValue.toJS();
      }
    }

    // Update the history

    // If we have some undo depth, cut the undone steps out of the history since
    // we are now branching forward with new changes.
    const appliedColorsHistory = this.state.appliedColorsHistory.slice(
      this.state.undoDepth
    );
    const historyEntry = {
      keys,
      value,
      previousValue
    };
    // Add the new history entry to the beginning of the array
    appliedColorsHistory.unshift(historyEntry);
    // If we have too many items in the array, delete the oldest one
    if (appliedColorsHistory.length > MAX_HISTORY_LENGTH) {
      appliedColorsHistory.pop();
    }

    // Set state
    this.setState({
      appliedColors,
      appliedColorsHistory,
      undoDepth: 0
    });
  }

  /**
   * Undo the previous change based on undoDepth and appliedColorsHistory
   */
  handleUndo = () => {
    let appliedColors;
    const currentUndoDepth = this.state.undoDepth;

    // Cannot undo if there are no more steps to undo
    if (currentUndoDepth === this.state.appliedColorsHistory.length) {
      return;
    }
    const stepToUndo = this.state.appliedColorsHistory[currentUndoDepth];
    if (!stepToUndo.keys.length) {
      appliedColors = stepToUndo.previousValue;
    } else {
      const currentAppliedColors = fromJS(this.state.appliedColors);
      appliedColors = currentAppliedColors
        .setIn(stepToUndo.keys, stepToUndo.previousValue)
        .toJS();
    }
    this.setState({
      appliedColors,
      undoDepth: currentUndoDepth + 1
    });
  };

  /**
   * Redo the last undone change based on undoDepth and appliedColorsHistory
   */
  handleRedo = () => {
    let appliedColors;
    const currentUndoDepth = this.state.undoDepth;

    // Cannot redo if there is nothing to redo
    if (currentUndoDepth === 0) {
      return;
    }
    const stepToRedo = this.state.appliedColorsHistory[currentUndoDepth - 1];
    if (!stepToRedo.keys.length) {
      appliedColors = stepToRedo.value;
    } else {
      const currentAppliedColors = fromJS(this.state.appliedColors);
      appliedColors = currentAppliedColors
        .setIn(stepToRedo.keys, stepToRedo.value)
        .toJS();
    }
    this.setState({
      appliedColors,
      undoDepth: currentUndoDepth - 1
    });
  };

  /*
   * Cancels any pending promises before being unmounted.
   */
  componentWillUnmount() {
    this.cancelablePromises.forEach(promise => promise.cancel());
  }

  /**
   * An array of promises that may need to be cancelled when the component is unmounted
   */
  cancelablePromises = [];

  /**
   * Handles when a different color is selected by updating state.
   * @param  {String} colorName The name of the newly selected color
   */
  handleColorSelection = colorName => {
    const currentColor = this.props.product.colors.find(color =>
      softCompareStrings(color.name, colorName)
    );
    this.setState({
      currentColor
    });
  };

  /**
   * Handles when a different variation is selected by updating state.
   * @param  {String} variationName The name of the newly selected variation
   */
  handleVariationSelection = variationName => {
    const currentVariation = this.props.product.variations.find(variation =>
      softCompareStrings(variation.name, variationName)
    );
    this.setState({
      currentVariation
    });
  };

  /**
   * Set the color for the specified id on the current variation to the current color.
   * @param  {String} id The ID of the panel, taken from data-id on the element.
   */
  handleColorApplied = id =>
    this._applyColors(
      [this.state.currentVariation.name, id],
      this.state.currentColor
    );

  /**
   * Generates the design variations based on the product variations and the applied colors.
   * @return {Object[]} Each object contains name, primary, and svg.
   */
  generateDesignVariations = () => {
    const appliedColors = this.state.appliedColors;
    const productVariations = this.props.product.variations;

    // Build each variation
    return productVariations.map((variation, index) => {
      // Render the blank variation from the product in memory
      const render = new window.DOMParser().parseFromString(
        variation.svg,
        "text/xml"
      );
      const colorMap = appliedColors[variation.name] || {};

      // Apply each color to the rendered variation
      Object.keys(colorMap).forEach(id => {
        const color = colorMap[id].color;
        const panel = render.querySelector(`[data-id="${id}"]`);
        panel.setAttribute("fill", color);
      });

      // Get the new SVG string from the render.
      const svg = render.querySelector("svg").outerHTML;

      // Return the variation
      return {
        name: variation.name,
        primary: !index,
        svg
      };
    });
  };

  /** Clears all colors from the current variation */
  handleReset = () => this._applyColors([this.state.currentVariation.name], {});

  /**
   * Handles save by parsing data and submitting a request to create a new design. Redirects to that
   * design's edit page when successful.
   * @param  {Object} data must contain name and user(id)
   */
  handleSave = data => {
    const { name, user } = data;
    const design = {
      name,
      user,
      product: this.props.product.id,
      variations: this.generateDesignVariations(),
      status: user === "0" ? Status.PUBLIC : Status.UNLISTED
    };
    const promise = makeCancelable(this.props.onSave(design));
    promise.promise.then(response => {
      const designId = response.data.id;
      if (data.user === "0") {
        // If the design was created anonymously, go to the view page
        window.location.replace(`/view/${designId}`);
      } else {
        window.location.replace(`/edit/${designId}`);
      }
    });
    this.cancelablePromises.push(promise);
  };

  /**
   * Handles update by parsing data and submitting a request to update the design.
   */
  handleUpdate = () => {
    const design = {
      id: this.props.design.id,
      variations: this.generateDesignVariations()
    };
    this.props.onUpdate(design);
  };

  /**
   * Gets the applied colors for the current variation
   */
  getCurrentVariationColors = () => {
    const currentVariationName = this.state.currentVariation.name;
    return this.state.appliedColors[currentVariationName] || {};
  };

  /**
   * Handles auto fill by merging the colors applied to the current variation on top of the colors
   * applied to every other variation.
   */
  handleAutofill = () => {
    const currentColors = this.getCurrentVariationColors();
    const variations = this.props.product.variations;
    const appliedColors = variations.reduce((accumulated, variation) => {
      accumulated[variation.name] = {
        ...currentColors
      };
      return accumulated;
    }, {});
    this._applyColors([], appliedColors);
  };

  handleChangeBackground = value => this.setState({ background: value });

  handleToggleHideOutlines = () =>
    this.setState({ hideOutlines: !this.state.hideOutlines });

  render() {
    if (
      isEmbedded &&
      this.props.product &&
      !embedAllowed(this.props.product.embed.split(","))
    ) {
      return (
        <ErrorPage
          errorCode={401}
          errorMessage="Embedding of this page is not permitted."
        />
      );
    }
    const data = {
      actions: {
        applyColor: this.handleColorApplied,
        autofill: this.handleAutofill,
        changeBackground: this.handleChangeBackground,
        redo: this.handleRedo,
        reset: this.handleReset,
        save: this.handleSave,
        selectColor: this.handleColorSelection,
        selectVariation: this.handleVariationSelection,
        toggleHideOutlines: this.handleToggleHideOutlines,
        undo: this.handleUndo,
        update: this.handleUpdate
      },
      props: {
        appliedColors: this.state.appliedColors,
        background: this.state.background,
        canRedo: this.state.undoDepth !== 0,
        canUndo:
          this.state.undoDepth !== this.state.appliedColorsHistory.length,
        currentColor: this.state.currentColor,
        currentVariation: this.state.currentVariation,
        currentVariationColors: this.getCurrentVariationColors(),
        hideOutlines: this.state.hideOutlines
      }
    };
    return this.props.children(data);
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onSave: CREATE_DESIGN,
  onUpdate: UPDATE_DESIGN
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorContainer);