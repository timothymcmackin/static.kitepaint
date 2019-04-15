import React from "react";
import styled from "styled-components";
import Text from "./Text";

/**
 * A styled <h2> element.
 * This uses <Text> and passes arguments there.
 * @param {Node} children The items to render inside the <h2>
 */
const H2 = ({ children, ...props }) => (
  <Text as="h2" {...props}>
    {children}
  </Text>
);
const StyledH2 = styled(H2)`
  font-size: 24px;
  line-height: 24px;
`;
export default StyledH2;
