import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Titillium+Web&display=swap');
    ${reset};
    * {
        box-sizing: border-box;
        font-family: 'Titillium Web', sans-serif;
    }
    a {
        text-decoration:none;
    }

`;
