import { useGLTF } from "@react-three/drei"
import { useAnimation } from "framer-motion";
type Tipa= {
  name: string;
};
 
  export const  Loader = ({name}:Tipa)=>{
    const {scene,animations} = useGLTF(`/threeModels/${name}.glb`)
    return(
      <>
      <ambientLight/>
<primitive object={scene} />
</>
)
}
