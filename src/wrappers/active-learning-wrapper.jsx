import ActiveLearningPage from "../pages/active-learning-page";
const { useParams } = require("react-router-dom");

function ActiveLearningWrapper() {
    let { rounds, queries, round } = useParams();

    return (
        <ActiveLearningPage params={{ rounds, queries, round }} />
    );
}

export default ActiveLearningWrapper;