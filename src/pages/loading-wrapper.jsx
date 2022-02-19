import LoadingPage from "./loading";
const { useParams } = require("react-router-dom");

function LoadingWrapper() {
    let {page} = useParams();

    return (
        <LoadingPage nextPage={{page}} />
    );
}

export default LoadingWrapper;