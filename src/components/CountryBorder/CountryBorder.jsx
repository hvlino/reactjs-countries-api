import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Context } from '../../Context';
import { getTargetCountry } from '../../countryServices';

const BordersDiv = styled.div`
a {
  background: ${(props) => props.theme[props.currenttheme].secondaryBackground};
  color: ${(props) => props.theme[props.currenttheme].primaryText};
  box-shadow: ${(props) => props.theme[props.currenttheme].shadow};
}
`;

const CountryBorder = function CountryBorder({ code }) {
  const [country, setCountry] = useState('');
  const { theme } = useContext(Context);

  const controller = new AbortController();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTargetCountry(controller.signal, code);
        setCountry(result[0]);
      } catch (e) {
        controller.abort();
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  return country ? (
    <BordersDiv currenttheme={theme}>
      <Link currenttheme={theme} to={`/countries/${country.name.common.toLowerCase()}`}>
        {country.name.common}
      </Link>
    </BordersDiv>
  ) : '';
};

CountryBorder.propTypes = {

  code: PropTypes.string.isRequired,
};

export default CountryBorder;
