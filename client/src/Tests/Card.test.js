import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";

import * as data from "../../db.json";
import Card from "../components/Card";

configure({ adapter: new Adapter() });

describe("<Card />", () => {
  let Card;
  let [recipe1] = data.recipes;

  beforeEach(() => {
    Card = (recipe) =>
      shallow(
        <Card
          key={recipe.id}
          id={recipe.id}
          name={recipe.name}
          image={recipe.image}
          diets={recipe.diets}
        />
      );
    expect(isReact.classComponent(Card)).toBeFalsy();
  });

  it('Debería renderizar un tag "img" y utilizar como source la imagen del personaje', () => {
    expect(characterCard(recipe1).find("img").at(0).prop("src")).toEqual(
      recipe1.image
    );
  });

  it('Debería renderizar un "p" que contenga el texto "Name: " más el nombre completo del personaje', () => {
    expect(characterCard(recipe1).find("h3").at(1).text()).toBe(
      `${recipe1.name}`
    );
  });

});
