type TournamentQuestionProps = {
  isFinal?: boolean;
};

function TournamentQuestion({ isFinal = false }: TournamentQuestionProps) {
  const title = isFinal ? '내가 정말 갖고 싶은 건?' : '지금 더 갖고 싶은 건?';

  return (
    <h1 className="title-1 text-text-neutral-primary">{title}</h1>
  );
}

export default TournamentQuestion;
