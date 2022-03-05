import LoadingPage from "./loading";
const { useParams } = require("react-router-dom");

function LoadingWrapper() {
    let { page, imgDir, lblDir, speciesOrSaveDir, rounds, queries, round } = useParams();

    return (
        <LoadingPage params={{ page, imgDir, lblDir, speciesOrSaveDir, rounds, queries, round }} />
    );
}

export default LoadingWrapper;