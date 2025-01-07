import { Github } from "lucide-react";

const MyLabel = () => {
    return ( 
        <div className="z-50 fixed h-fit w-fit right-2 bottom-2 bg-zinc-500 text-white flex items-center gap-2 rounded-md px-3 py-1.5">
            <a href="https://github.com/Ayusht0mar/airbnb-clone">
                <Github size={22}/>
            </a>
            <a href="https://www.ayushtomar.in/" >
                Created by Ayush
            </a>
        </div>
     );
}
 
export default MyLabel;