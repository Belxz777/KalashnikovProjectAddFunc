interface WrapperProps {
    className:string;
  }
const BurgerMenuIcon = () => {   
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <line x1="4" y1="6" x2="20" y2="6" stroke="black" strokeWidth="2" />
        <line x1="4" y1="12" x2="20" y2="12" stroke="black" strokeWidth="2" />
        <line x1="4" y1="18" x2="20" y2="18" stroke="black" strokeWidth="2" />
      </svg>
    );
  };
  
  export default BurgerMenuIcon;