type TournamentHeaderProps = {
  name: string;
};

function TournamentHeader({ name }: TournamentHeaderProps) {
  return (
    <div className="flex flex-col items-center">
      <p className="title-1">{name}</p>
    </div>
  );
}

export default TournamentHeader;
