import styled from 'styled-components';
import FormField from './FormField';

export const SearchContainer = styled.section`
  margin-bottom: 24px;
  overflow: hidden;
`;

export const EditWrap = styled.section`
  display: flex;
  align-items: center;
  
  .anticon {
    margin-right: 8px;
    font-size: 15px;
    cursor: pointer;
    
    &:hover {
      color: ${props => props.theme.primaryColor};
    }

    &.anticon-delete:hover {
      color: palevioletred;
    }
  }
`;

export {
  FormField,
};
