import { FC } from "react"
import ContentLoader from "react-content-loader"


const Sceleton:FC = (props) => (
  <ContentLoader 
  className="pizza-block"
    speed={1.5}
    width={260}
    height={400}
    viewBox="0 0 260 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="244" rx="10" ry="10" width="260" height="25" /> 
    <rect x="0" y="285" rx="10" ry="10" width="260" height="59" /> 
    <rect x="0" y="368" rx="10" ry="10" width="93" height="23" /> 
    <rect x="123" y="360" rx="20" ry="20" width="135" height="37" /> 
    <circle cx="130" cy="114" r="114" />
  </ContentLoader>
)

export default Sceleton