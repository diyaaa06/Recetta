import { useNavigate } from "react-router-dom"
export const Home = () => {
  const navigate=useNavigate();
  return(
    <div class="Home">
      <div className="HomeBody">
      <div class="RecettaHeading">Recetta</div>
      <div class="homethought">Make magic with what you have</div>
      <div class="homebuttonsgroup">
        <div>
          <button className="homebutton" onClick={()=>{
            navigate("/fromname");
          }}>By Name
          </button>
        </div>
        <div>
          <button className="homebutton" onClick={()=>{
            navigate("/fromimage");
          }}>By Image
          </button>
        </div>
        <div>
          <button className="homebutton" onClick={()=>{
            navigate("/fromingredients");
          }}>By Ingredients
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}