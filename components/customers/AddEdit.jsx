import { useRouter } from "next/router";
import { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
// import * as Yup from "yup";
import React from "react";
import InputMask from "react-input-mask";

React.useLayoutEffect = React.useEffect;

import { Link } from "../../components";
import { customerService, alertService } from "../../services";

export { AddEdit };

function AddEdit(props) {
  const savedCustomer = props?.customer;
  const isAddMode = props.customer?false:true;
  const router = useRouter();
  // form validation rules
  // const validationSchema = Yup.object().shape({
  //   name: Yup.string().required("Nome precisa ser preenchido"),
  //   phoneOne: Yup.string().notRequired("Celular precisa ser preencido"),
  //   logradouro: Yup.string().notRequired("Logradouro precisa ser preenchido"),
  //   complemento: Yup.string().notRequired("Complemento precisa ser preenchido"),
  //   bairro: Yup.string().notRequired("Bairro precisa ser preenchido"),
  // });
  const formOptions = {};

  // get functions to build form with useForm() hook
  const { register, setValue, getValues, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const [customer, setCustomer] = useState({})
  function onSubmit(data) {
    return isAddMode ? createUser(data) : updateUser(savedCustomer.id, data);
  }

  async function findAddress(cep) {
    const address = await customerService.getAddressByCep(cep.replace("-", ""));
    setValue('address.logradouro', address.logradouro);
    setValue('address.complemento', address.complemento);
    setValue('address.bairro', address.bairro);
    setValue('address.localidade', address.localidade);
    return address;
  }
  async function createUser(data) {
    try {
      await customerService
        .create(data);
      alertService.success("Cliente adicionado", { keepAfterRouteChange: true });
      router.push(".");
    } catch (message_2) {
      return console.error(message_2);
    }
  }

  function updateUser(id, data) {
    return customerService
      .update(id, data)
      .then(() => {
        alertService.success("Cliente editado", { keepAfterRouteChange: true });
        router.push("..");
      })
      .catch(alertService.error);
  }
  

  useEffect(() => {
    if (!isAddMode) {
        customerService.getById(props.customer.id).then(customer => {
            setValue('name', customer.name)
            setValue('cpf',customer.cpf)
            setValue('address.cep', customer.address.cep)
            setValue('address.logradouro', customer.address.logradouro)
            setValue('address.complemento', customer.address.complemento)
            setValue('address.bairro', customer.address.bairro)
            setValue('address.localidade', customer.address.local)
            setValue('phone.one', customer.phone.one)
            setValue('phone.two', customer.phone.two)
            setCustomer(customer);
            console.log('cep', customer.address.cep);
        });
    }
}, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{isAddMode ? "Adicionar Cliente" : "Editar Cliente"}</h1>
      <div className="grid">
        <div className="form-row">
          <div className="form-group col"></div>
          <div className="form-group col-3">
            <label>Nome</label>
            <input
              name="name"
              type="text"
              autoComplete="disabled"
              {...register("name")}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </div>
          <div className="form-group col-3">
            <label>CPF</label>
            <InputMask
              mask="999.999.999-99"
              name="cpf"
              type="text"
              autoComplete="disabled"
              {...register("cpf")}
              className={`form-control ${errors.cpf ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.cpf?.message}</div>
          </div>
          <div className="form-group col-3">
            <label>Celular</label>
            <InputMask
              mask="(99)99999-9999"
              name="phone.one"
              type="text"
              autoComplete="disabled"
              {...register("phone.one")}
              className={`form-control ${errors.phoneOne ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.phoneOne?.message}</div>
          </div>
          <div className="form-group col-3">
            <label>Telefone</label>
            <InputMask
              mask="(99)99999-9999"
              name="phone.two"
              type="text"
              autoComplete="disabled"
              {...register("phone.two")}
              className={`form-control ${errors.phoneTwo ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.phoneTwo?.message}</div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-2">
            <label>Cep</label>
            <InputMask
              mask="99999-999"
              name="cep"
              type="text"
              autoComplete="disabled"
              onBlurCapture={() => findAddress(getValues("address.cep"))}
              {...register("address.cep")}
              className={`form-control ${errors.cep ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.cep?.message}</div>
          </div>
          <div className="form-group col-3">
            <label>Logradouro</label>
            <input
              name="address.logradouro"
              type="text"
              autoComplete="disabled"
              {...register("address.logradouro")}
              className={`form-control ${errors.logradouro ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.logradouro?.message}</div>
          </div>
          <div className="form-group col-3">
            <label>Complemento</label>
            <input
              name="address.complemento"
              type="text"
              autoComplete="disabled"
              {...register("address.complemento")}
              className={`form-control ${errors.complemento ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.complemento?.message}</div>
          </div>
          <div className="form-group col-3">
            <label>Bairro</label>
            <input
              name="address.bairro"
              type="text"
              autoComplete="disabled"
              {...register("address.bairro")}
              className={`form-control ${errors.bairro ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.bairro?.message}</div>
          </div>
          <div className="form-group col-3">
            <label>Cidade</label>
            <input
              name="address.cidade"
              type="text"
              autoComplete="disabled"
              {...register("address.localidade")}
              className={`form-control ${errors.cidade ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.cidade?.message}</div>
          </div>
        </div>
        <div className="form-group">
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="btn btn-primary mr-2"
          >
            {formState.isSubmitting && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Salvar
          </button>
          <button
            onClick={() => reset(formOptions.defaultValues)}
            type="button"
            disabled={formState.isSubmitting}
            className="btn btn-secondary"
          >
            Limpar
          </button>
          <Link href="/customers" className="btn btn-link">
            Voltar
          </Link>
        </div>
      </div>
    </form>
  );
}
