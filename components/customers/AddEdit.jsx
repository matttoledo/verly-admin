import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as Yup from "yup";
import React from "react";
import InputMask from "react-input-mask";
import { Link } from "../../components";
import { customerService, alertService } from "../../services";

React.useLayoutEffect = React.useEffect;

export { AddEdit };

function AddEdit(props) {
  const savedCustomer = props?.customer;
  const isAddMode = props.customer ? false : true;
  const router = useRouter();
  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nome precisa ser preenchido."),
    address: Yup.object().shape({
      logradouro: Yup.string().required("Logradouro precisa ser preenchido.")

    }),
    phone: Yup.object().shape({
      one: Yup.string().required("Celular precisa ser preencido."),
    })


    // complemento: Yup.string().required("Complemento precisa ser preenchido."),
    // bairro: Yup.string().required("Bairro precisa ser preenchido."),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, setValue, getValues, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const [customer, setCustomer] = useState({})

  function onSubmit(data) {
    return isAddMode ? createUser(data) : updateUser(savedCustomer.id, data);
  }

  async function findAddress(cep) {
    const address = await customerService.getAddressByCep(cep.replace("-", ""));
    setValue('address.logradouro', address.logradouro)
    setValue('address.complemento', address.complemento);
    setValue('address.bairro', address.bairro);
    setValue('address.localidade', address.localidade);
    return address;
  }
  async function createUser(data) {
    try {
      data.cpf = data.cpf.replace(".", "");
      data.phone.one = data.phone.one.replace("(", "").replace(")", "").replace("-", "").replace("_", "");
      data.phone.two = data.phone.two.replace("(", "").replace(")", "").replace("-", "").replace("_", "");
      await customerService.create(data);
      router.push(".");
      return data.then(() => {
        alertService.success("Cliente adicionado", { keepAfterRouteChange: true });
        router.push(".")
      })
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
        setValue('cpf', customer.cpf)
        setValue('address.cep', customer.address.cep)
        setValue('address.logradouro', customer.address.logradouro)
        setValue('address.complemento', customer.address.complemento)
        setValue('address.bairro', customer.address.bairro)
        setValue('address.localidade', customer.address.localidade)
        setValue('phone.one', customer.phone.one)
        setValue('phone.two', customer.phone.two)
        setCustomer(customer);
      });
    }
  }, []);

  return (
    <div className="container border border-dark w-auto bg-light">
      <h2 className="d-flex justify-content-center my-2">{isAddMode ? "Adicionar Cliente" : "Editar Cliente"}</h2>
      <div className="mx-auto h-auto d-inline-block d-flex justify-content-center" style={{ width: '400px', height: '700px' }}>

        <form onSubmit={handleSubmit(onSubmit)} className="d-flex justify-content-center m h-100">
          <div className="grid">
            <div className="form-row">
              <div className="form-group col"></div>
              <div className="form-group col">
                <label>Nome</label>
                <input
                  name="name"
                  type="text"
                  autoComplete="off"
                  {...register("name")}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.name?.message}</div>
              </div>
              <div className="form-group">
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
              <div className="form-group">
                <label>Celular</label>
                <InputMask
                  mask="(99)99999-9999"
                  name="phoneOne"
                  type="text"
                  autoComplete="disabled"
                  {...register("phone.one")}
                  className={`form-control ${errors.phone?.one ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.phone?.one?.message}</div>
              </div>
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
                <label>Logradouro</label>
                <input
                  name="address.logradouro"
                  type="text"
                  autoComplete="off"
                  {...register("address.logradouro")}
                  className={`form-control ${errors.address?.logradouro ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.address?.logradouro?.message}</div>
              </div>
              <div className="form-group">
                <label>Complemento</label>
                <input
                  name="complemento"
                  type="text"
                  autoComplete="disabled"
                  {...register("address.complemento")}
                  className={`form-control ${errors.complemento ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.complemento?.message}</div>
              </div>
              <div className="form-group">
                <label>Bairro</label>
                <input
                  name="bairro"
                  type="text"
                  autoComplete="disabled"
                  {...register("address.bairro")}
                  className={`form-control ${errors.bairro ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.bairro?.message}</div>
              </div>
              <div className="form-group">
                <label>Cidade</label>
                <input
                  name="address.localidade"
                  type="text"
                  autoComplete="disabled"
                  {...register("address.localidade")}
                  className={`form-control ${errors.cidade ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.cidade?.message}</div>
              </div>
            </div>
            <div className="form-group d-flex justify-content-between my-4">
              <button
                type="submit"
                disabled={formState.isSubmitting}
                className="btn btn-outline-primary"
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
                className="btn btn-outline-warning"
              >
                Limpar
              </button>
              <Link href="/customers" className="btn btn-outline-secondary">
                Voltar
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
