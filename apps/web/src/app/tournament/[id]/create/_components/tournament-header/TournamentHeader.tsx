type TournamentHeaderProps = {
  name: string;
};

function TournamentHeader({ name }: TournamentHeaderProps) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="title-1">{name}</h1>
    </div>
  );
}

export default TournamentHeader;
