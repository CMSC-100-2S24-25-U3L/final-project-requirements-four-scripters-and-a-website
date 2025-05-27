import '../css/loading-screen.css';
import  LoadingGif from '../assets/loading.gif'

export default function HarvestLoadingScreen() {
    return(
        <div className="loading-screen-container">
            <img src={LoadingGif}></img>
        </div>
    );
}