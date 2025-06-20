import { useParams } from "react-router-dom";

const tutorialLinks = [
  {
    id: "1",
    title: "Getting Started",
    link: "https://www.youtube.com/embed/SqcY0GlETPk?si=713vxq5nEXyl8PyS",
  },
];

type URLParams = {
  tutorialId?: string;
};

export const Tutorial = () => {
  const { tutorialId } = useParams<URLParams>();
  const selectedTutorial = tutorialLinks.find(
    (tutorial) => tutorial.id === tutorialId
  );
  if (!selectedTutorial) {
    return <div>Tutorial not found</div>;
  }
  return (
    <div>
      <h1>{selectedTutorial?.title}</h1>
      <iframe width="420" height="315" src={selectedTutorial?.link}></iframe>
    </div>
  );
};
