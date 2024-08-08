function ProfileHeaders({ text }: { text: string }) {
  return (
    <div className="mt-10">
      <h1 className="text-4xl font-bold lg:ml-5">{text}</h1>
    </div>
  );
}

export default ProfileHeaders;
