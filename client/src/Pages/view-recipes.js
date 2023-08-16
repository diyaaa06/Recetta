import { useEffect, useState } from "react"
import axios from "axios";
import {useCookies} from 'react-cookie';
import {useGetUserId} from '../hooks/useGetUserId'
export const ViewRecipes = () => {
  const userID=useGetUserId();
  const [recipes,setRecipes]=useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies,_]=useCookies("access_token");
  useEffect(()=>{
    const fetchRecipes=async()=>{
      try{
        const response=await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
        
      }catch(err){
        console.error(err);
      }
    };

    const fetchSavedRecipes = async () =>{
      try {
        const response=await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        
      }
    }
    fetchRecipes();
    fetchSavedRecipes();
  },[]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes", 
        {
        recipeID,
        userID,
      },{
        headers:{authorization: cookies.access_token},
      }
    );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };
  const isRecipeSaved = (id) => savedRecipes.includes(id);
  return(
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe)=>(
          <li key={recipe._id}>
            <div >
              <h2>{recipe.name}</h2>
              <button onClick={()=>saveRecipe(recipe._id)}
              disabled={isRecipeSaved(recipe._id)}>
                {isRecipeSaved(recipe._id)?"Saved":"Save"}</button>
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