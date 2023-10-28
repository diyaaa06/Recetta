import { useEffect, useState } from "react"
import axios from "axios";
import {useCookies} from 'react-cookie';
import {useGetUserId} from '../hooks/useGetUserId'
export const SavedRecipes = () => {
  const userID=useGetUserId();
  const [savedRecipes,setSavedRecipes]=useState([]);
  const [cookies,_]=useCookies("access_token");
  useEffect(()=>{
    const fetchSavedRecipes = async () =>{
      try {
        const response=await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        
      }
    }
    fetchSavedRecipes();
  },[userID]);


  // const unsaveRecipe = async (recipeID) => {
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:3001/recipes/savedRecipes/${recipeID}`,
  //       {
  //         headers: {
  //           authorization: cookies.access_token
  //         }
  //       }
  //     );
  //     setSavedRecipes(response.data.savedRecipes);
  //   } catch (error) {
  //     console.error(error);
  //     // Handle errors or provide user feedback here
  //   }
  // };
  

  return(
    <div>
      <h2>Saved Recipes</h2>
      <ul>
        {savedRecipes.map((recipe)=>(
          <li key={recipe._id}>
            <div >
              <h2>{recipe.name}</h2>
              
            </div>
              <ol>
              {recipe.ingredients.map(ingre=>
              (<li>{ingre}</li>)
              )}
              </ol>
            <div>
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageURL} alt={recipe.name}></img>\
            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>
    </div>
  )
}