import ActiveLearningPage from "./active-learning";
const { useParams } = require("react-router-dom");

function ActiveLearningWrapper() {
    let { rounds, queries, round } = useParams();

    return (
        <ActiveLearningPage params={{ rounds, queries, round }} />
    );
}

export default ActiveLearningWrapper;