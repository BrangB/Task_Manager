import { GlobalUpdateForm } from "@/app/context/GlobalProvider";
import React, {
  FormEvent,
  useContext,
  useState,
  useRef,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { GlobalContext } from "@/app/context/GlobalProvider";
import BtnAnimation from "../ButtonAnimation/BtnAnimation";
import BackBtn from "../ButtonAnimation/BackBtn";

interface Task {
  createdat: string;
  date: string;
  description: string;
  id: string;
  isCompleted: boolean;
  isImportant: boolean;
  title: string;
  updatedat: string;
  user_id: string;
}

interface FormData {
  selectedTask: Task;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
}

const UpdateForm: React.FC<FormData> = ({ selectedTask, setSelectedTask }) => {
  const { showUpdateForm, setShowUpdateForm } = useContext(GlobalUpdateForm);
  const { globalTasks, setGlobalTasks } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handlerForm = async (e: FormEvent) => {
    e.preventDefault();
    if (
      selectedTask.title == "" ||
      selectedTask.description == "" ||
      selectedTask.date == ""
    ) {
      toast.error("Please fill out all fields");
    } else {
      try{
          setLoading(true);
          const payload = {
            id: selectedTask.id,
            user_id: selectedTask.user_id,
            title: selectedTask.title.trim(),
            description: selectedTask.description.trim(),
            date: selectedTask.date.trim(),
            isCompleted: selectedTask.isCompleted,
            isImportant: selectedTask.isImportant
        }
          const res = await axios.post("/api/tasks/updatetask", { data : payload })
          toast.success("Updating Task Successfully!!")
          setLoading(false);
          let updatedTasks = globalTasks.map((task : Task) => {
            if(task.id === selectedTask.id) {
              return {
                ...task,
                user_id: selectedTask.user_id,
                title: selectedTask.title,
                description: selectedTask.description,
                date : selectedTask.date,
                isCompleted: selectedTask.isCompleted,
                isImportant: selectedTask.isImportant
            }
            }
            return task
          })
          setGlobalTasks(updatedTasks)
          setShowUpdateForm(false)
      }catch(err){
          console.log(err);
          toast.error("Updating New Tasks Fails")
          setLoading(false);
      }
    }
  };

  return (
    <div
      className={`flex items-center justify-center w-screen h-screen fixed top-0 left-0 backdrop-blur-md bg-[#ffffff8e] z-50 ${
        showUpdateForm ? "scale-100" : "scale-0"
      } duration-200`}
    >
      <div
        className="absolute top-10 right-10 bg-green-600 flex items-center justify-center p-2 rounded-full"
        onClick={() => setShowUpdateForm(false)}
      >
        <BackBtn />
      </div>
      {selectedTask && (
        <div className="form p-8 bg-white min-w-[300px] flex flex-col gap-5 shadow-lg hover:shadow-xl duration-200">
          <h1 className="text-xl text-center font-semibold">
            Update <span className="text-green-600">Task</span>
          </h1>
          <form onSubmit={handlerForm} className="flex flex-col gap-8">
            <div className="title flex flex-col gap-2">
              <label
                htmlFor="title"
                className="text-sm text-gray-800 font-semibold border-l-2 px-2 border-green-600"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                ref={titleRef}
                value={selectedTask.title}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, title: e.target.value })
                }
                className="px-2 py-1 outline-green-500 border-gray-600 border placeholder:text-sm"
                placeholder="Enter task title"
              />
            </div>
            <div className="desc flex flex-col gap-2">
              <label
                htmlFor="desc"
                className="text-sm text-gray-800 font-semibold border-l-2 px-2 border-green-600"
              >
                Description
              </label>
              <input
                type="text"
                id="desc"
                ref={descriptionRef}
                value={selectedTask.description}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    description: e.target.value,
                  })
                }
                className="px-2 py-1 outline-green-500 border-gray-600 border placeholder:text-sm"
                placeholder="Enter task title"
              />
            </div>
            <div className="date flex flex-col gap-2">
              <label
                htmlFor="date"
                className="text-sm text-gray-800 font-semibold border-l-2 px-2 border-green-600"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                value={selectedTask.date}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, date: e.target.value })
                }
                className="px-2 py-1 outline-green-500 border-gray-600 border placeholder:text-sm"
                placeholder="Enter task title"
              />
            </div>
            <div className="important flex flex-col gap-2">
              <label
                htmlFor="vip"
                className="text-sm text-gray-800 font-semibold border-l-2 px-2 border-green-600"
              >
                Important
              </label>
              {selectedTask.isImportant ? (
                <i
                  className=" fa-regular fa-square-check"
                  onClick={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      isImportant: !selectedTask.isImportant,
                    })
                  }
                ></i>
              ) : (
                <i
                  className="fa-regular fa-square"
                  onClick={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      isImportant: !selectedTask.isImportant,
                    })
                  }
                ></i>
              )}
            </div>
            <div className="important flex flex-col gap-2">
              <label
                htmlFor="completed"
                className="text-sm text-gray-800 font-semibold border-l-2 px-2 border-green-600"
              >
                Completed
              </label>
              {selectedTask.isCompleted ? (
                <i
                  className=" fa-regular fa-square-check"
                  onClick={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      isCompleted: !selectedTask.isCompleted,
                    })
                  }
                ></i>
              ) : (
                <i
                  className="fa-regular fa-square"
                  onClick={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      isCompleted: !selectedTask.isCompleted,
                    })
                  }
                ></i>
              )}
            </div>
            <button className="bg-green-500 hover:bg-green-600 duration-200 flex items-center justify-center text-white p-3 h-10 uppercase font-semibold text-sm">
              {loading ? <BtnAnimation /> : "Update Task"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateForm;
