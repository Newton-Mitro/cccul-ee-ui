import { IAuthUserModel } from 'pages/login/model/data/IAuthUserModel';

interface TakenExamsProps {
  user: IAuthUserModel | null;
}

const TakenExams: React.FC<TakenExamsProps> = ({ user }) => {
  return (
    <div className="my-6">
      <h1 className="text-xl font-bold">Previous Taken Exams</h1>
      <div className="flex items-center gap-6 rounded-lg border p-6">
        <img
          src={`data:image/jpeg;base64,${user?.UserPicture}`}
          alt=""
          className="rounded-full"
          width={100}
          height={100}
        />
        <div className="">
          <h1 className="font-bold">{user?.UserName}</h1>
          <p>{user?.EmployeeCode}</p>
          <p>{user?.Email}</p>
          <p className="text-xs">{user?.Address}</p>
        </div>
      </div>
    </div>
  );
};

export default TakenExams;
