import React from "react";
import renderer from "react-test-renderer";

import Recipe from "./index";

it("renders Burrito recipe correctly", () => {
  const recipe = renderer.create(<Recipe name="Burrito" />).toJSON();
  expect(recipe).toMatchInlineSnapshot(`
<div
  className="RecipeItem"
>
  Recipe: 
  Burrito
</div>
`);
});
