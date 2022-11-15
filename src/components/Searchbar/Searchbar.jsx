import { useState } from 'react';
import {
  SearchBarHeader,
  SearchForm,
  FormInput,
  ButtonForm,
} from './SearchBarStyled';
import PropTypes from 'prop-types';
// import { SearchAlt } from '@styled-icons/boxicons-regular';

export const Searchbar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleChange = e => {
    setName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(name);
    setName('');
  };
  return (
    <>
      <SearchBarHeader className="searchbar">
        <SearchForm className="form" onSubmit={handleSubmit}>
          <ButtonForm type="submit" className="button">
            {/* <SearchAlt /> */}
            <span className="button-label">Search</span>
          </ButtonForm>

          <FormInput
            onChange={handleChange}
            value={name}
            name="name"
            className="input"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchBarHeader>
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// import React, { Component } from 'react';
// import {
//   SearchBarHeader,
//   SearchForm,
//   FormInput,
//   ButtonForm,
// } from './SearchBarStyled';
// import PropTypes from 'prop-types';

// export class Searchbar extends Component {
//   state = {
//     name: '',
//   };

//   onHandleChange = e => {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSubmit({ ...this.state });
//     this.setState({ name: '' });
//   };

//   render() {
//     return (
//       <>
//         <SearchBarHeader className="searchbar">
//           <SearchForm className="form" onSubmit={this.handleSubmit}>
//             <ButtonForm type="submit" className="button">
//               <span className="button-label">Search</span>
//             </ButtonForm>

//             <FormInput
//               onChange={this.onHandleChange}
//               value={this.state.name}
//               name="name"
//               className="input"
//               type="text"
//               autocomplete="off"
//               autoFocus
//               placeholder="Search images and photos"
//             />
//           </SearchForm>
//         </SearchBarHeader>
//       </>
//     );
//   }
// }

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
