import { putFuncionario } from "./FuncService";
import React, { useState, useEffect } from 'react';

function EditarFuncionario({ funcionarioInicial, onAtualizado, onCancelar }) {
  const [funcionario, setFuncionario] = useState(funcionarioInicial);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  useEffect(() => {
    setFuncionario(funcionarioInicial);
  }, [funcionarioInicial]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (['rua', 'numero', 'bairro', 'cidade', 'estado'].includes(name)) {
      setFuncionario(prev => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [name]: name === 'numero' ? parseInt(value) || '' : value
        }
      }));
    } else {
      setFuncionario(prev => ({
        ...prev,
        [name]: ['cpf', 'idade'].includes(name) ? parseInt(value) || '' :
                name === 'salario' ? parseFloat(value) || '' : value
      }));
    }
  };

  const validarFormulario = () => {
    if (!funcionario.nome || !funcionario.cpf || !funcionario.rg || 
        !funcionario.idade || !funcionario.salario || !funcionario.cargo || 
        !funcionario.estadocivil) {
      return 'Todos os campos obrigatórios devem ser preenchidos.';
    }

    if (funcionario.cpf.toString().length !== 11) {
      return 'CPF deve ter 11 dígitos.';
    }

    if (funcionario.rg.length > 8) {
      return 'RG deve ter no máximo 8 caracteres.';
    }

    if (funcionario.endereco.estado.length !== 2) {
      return 'Estado deve ter 2 caracteres (UF).';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroValidacao = validarFormulario();
    if (erroValidacao) {
      setErro(erroValidacao);
      setSucesso('');
      return;
    }

    setLoading(true);
    setErro('');
    setSucesso('');

    try {
      await putFuncionario(funcionario.id, funcionario);
      setSucesso('Funcionário atualizado com sucesso!');
      if (onAtualizado) onAtualizado();
    } catch (error) {
      console.error(error);
      setErro('Erro ao atualizar funcionário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Editar Funcionário</h1>

      {erro && <div className="alert alert-danger">{erro}</div>}
      {sucesso && <div className="alert alert-success">{sucesso}</div>}

      <form onSubmit={handleSubmit}>


        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Atualizando...' : 'Atualizar Funcionário'}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={onCancelar}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default EditarFuncionario;
