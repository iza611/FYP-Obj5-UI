import LoadingPage from "./loading";
const { useParams } = require("react-router-dom");

function LoadingWrapper() {
    let {page, imgDir, lblDir, species} = useParams();

    return (
        <LoadingPage params={{page, imgDir, lblDir, species}} />
    );
}

export default LoadingWrapper;