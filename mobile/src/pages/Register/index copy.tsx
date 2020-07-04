import React, { useCallback, useEffect, useState } from 'react';

import {Container, Titulo, Input, AddButton, TextButton} from './styles';
import { withFormik, Form, Field  } from 'formik';
import api from '../../services/api';

const MyFormWithFormik = withFormik({
  mapPropsToValues: () => ({ 
    nome: '',
    preco: null,
    categoria: ''
  }),
  handleSubmit: values => {

    console.log(values)
    /**
     * o values seria todos os valores do mapeados no  mapValuesToProps,
     * o segundo parametro são os métodos do formik, muito úteis
     * Antes de rodar o handleSubmit, o formik já roda o método de
     * validação dos dados, que posso escrever um novo artigo sobre
    **/
    // api.post('/produtos')
  }
})

const Register = () =>  (
  <Form> 
    <Field name="nome" />
    <Field name="preco" />
    <Field name="categoria" />
    <button type="submit" >
      Submit
    </button>
  </Form>
  );
export default MyFormWithFormik(Register);