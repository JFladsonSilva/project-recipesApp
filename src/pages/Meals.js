import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReceitasContext from '../context/ReceitasContext';
import Recipes from '../components/Recipes';
import { fetchFirstRecipes, fetchCategories } from '../helpers/fetchRecipe';
import Categories from '../components/Categories';

function Meals(props) {
  const { history } = props;

  const RecipeContext = useContext(ReceitasContext);
  const { recipes, setRecipes, setCategories } = RecipeContext;
  const isNull = recipes !== null;

  useEffect(() => {
    fetchFirstRecipes('Meals', setRecipes);
    fetchCategories('Meals', setCategories);
  }, []);

  useEffect(() => {
    if (!isNull) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (recipes.length === 1) {
      console.log('aqui');
      const { idMeal } = recipes[0];
      history.push(`/meals/${idMeal}`);
    }
  }, [recipes]);
  return (
    <div>
      <Header title="Meals" search />
      <Categories />
      <div>
        {
          isNull && <Recipes page="Meals" />
        }
      </div>
      <Footer />
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Meals;
