import { postFuncionario } from "./FuncService";
import React, { useState, useEffect } from 'react';

function CadastroFuncionario({ funcionario: funcionarioProp, onFuncionarioCadastrado }) {

  const [funcionario, setFuncionario] = useState({
    nome: '',
    cpf: '',
    rg: '',
    idade: '',
    salario: '',
    endereco: {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: ''
    },
    cargo: '',
    estadocivil: ''
  });

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  useEffect(() => {
    if (funcionarioProp) {
      setFuncionario({
        nome: funcionarioProp.nome || '',
        cpf: funcionarioProp.cpf || '',
        rg: funcionarioProp.rg || '',
        idade: funcionarioProp.idade || '',
        salario: funcionarioProp.salario || '',
        endereco: {
          rua: funcionarioProp.endereco?.rua || '',
          numero: funcionarioProp.endereco?.numero || '',
          bairro: funcionarioProp.endereco?.bairro || '',
          cidade: funcionarioProp.endereco?.cidade || '',
          estado: funcionarioProp.endereco?.estado || ''
        },
        cargo: funcionarioProp.cargo || '',
        estadocivil: funcionarioProp.estadocivil || ''
      });
      setErro('');
      setSucesso('');
    } else {
      setFuncionario({
        nome: '',
        cpf: '',
        rg: '',
        idade: '',
        salario: '',
        endereco: {
          rua: '',
          numero: '',
          bairro: '',
          cidade: '',
          estado: ''
        },
        cargo: '',
        estadocivil: ''
      });
      setErro('');
      setSucesso('');
    }
  }, [funcionarioProp]);

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

    if (funcionario.rg.length > 9) {
      return 'RG deve ter no máximo 9 caracteres.';
    }

    if (funcionario.endereco.estado.length !== 2) {
      return 'Estado deve ter 2 caracteres (UF).';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const erro = validarFormulario();
    if (erro) {
      setErro(erro);
      setSucesso('');
      return;
    }

    setLoading(true);
    setErro('');
    setSucesso('');

    try {
      await postFuncionario(funcionario);
      setSucesso(funcionarioProp ? 'Funcionário atualizado com sucesso!' : 'Funcionário cadastrado com sucesso!');

      if (!funcionarioProp) {
        setFuncionario({
          nome: '',
          cpf: '',
          rg: '',
          idade: '',
          salario: '',
          endereco: {
            rua: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: ''
          },
          cargo: '',
          estadocivil: ''
        });
      }

      if (onFuncionarioCadastrado) {
        onFuncionarioCadastrado();
      }

    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
      setErro('Erro ao cadastrar funcionário. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = (campo) => {
    if (!funcionarioProp) return '';
    if (['rua','numero','bairro','cidade','estado'].includes(campo)) {
      return funcionarioProp.endereco?.[campo] ? funcionarioProp.endereco[campo].toString() : '';
    }
    return funcionarioProp[campo] ? funcionarioProp[campo].toString() : '';
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{funcionarioProp ? 'Atualizar Funcionário' : 'Cadastro de Funcionário'}</h1>
      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}

      {sucesso && (
        <div className="alert alert-success" role="alert">
          {sucesso}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="nome" className="form-label">Nome *</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              name="nome"
              value={funcionario.nome}
              placeholder={getPlaceholder('nome')}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="cpf" className="form-label">CPF *</label>
            <input
              type="number"
              className="form-control"
              id="cpf"
              name="cpf"
              minLength={11}
              maxLength={11}
              value={funcionario.cpf}
              placeholder={getPlaceholder('cpf')}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="rg" className="form-label">RG *</label>
            <input
              type="text"
              className="form-control"
              id="rg"
              name="rg"
              maxLength={9}
              minLength={9}
              value={funcionario.rg}
              placeholder={getPlaceholder('rg')}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="idade" className="form-label">Idade *</label>
            <input
              type="number"
              className="form-control"
              id="idade"
              name="idade"
              min="0"
              value={funcionario.idade}
              placeholder={getPlaceholder('idade')}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="salario" className="form-label">Salário *</label>
            <input
              type="number"
              className="form-control"
              id="salario"
              name="salario"
              step="0.01"
              min="0"
              value={funcionario.salario}
              placeholder={getPlaceholder('salario')}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <h4 className="mt-4 mb-3">Endereço</h4>

        <div className="row">
          <div className="col-md-8 mb-3">
            <label htmlFor="rua" className="form-label">Rua</label>
            <input
              type="text"
              className="form-control"
              id="rua"
              name="rua"
              value={funcionario.endereco.rua}
              placeholder={getPlaceholder('rua')}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="numero" className="form-label">Número</label>
            <input
              type="number"
              className="form-control"
              id="numero"
              name="numero"
              min="0"
              value={funcionario.endereco.numero}
              placeholder={getPlaceholder('numero')}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="bairro" className="form-label">Bairro</label>
            <input
              type="text"
              className="form-control"
              id="bairro"
              name="bairro"
              value={funcionario.endereco.bairro}
              placeholder={getPlaceholder('bairro')}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="cidade" className="form-label">Cidade</label>
            <input
              type="text"
              className="form-control"
              id="cidade"
              name="cidade"
              value={funcionario.endereco.cidade}
              placeholder={getPlaceholder('cidade')}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-2 mb-3">
            <label htmlFor="estado" className="form-label">Estado (UF)</label>
            <input
              type="text"
              className="form-control"
              id="estado"
              name="estado"
              maxLength="2"
              value={funcionario.endereco.estado}
              placeholder={getPlaceholder('estado')}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="cargo" className="form-label">Cargo *</label>
            <select
              className="form-select"
              id="cargo"
              name="cargo"
              value={funcionario.cargo}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione o cargo</option>
              <option value="CAIXA">Caixa</option>
              <option value="REPOSITOR">Repositor</option>
              <option value="LIMPEZA">Limpeza</option>
              <option value="GERENTE">Gerente</option>
              <option value="ESTAGIARIO">Estagiário</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="estadocivil" className="form-label">Estado Civil *</label>
            <select
              className="form-select"
              id="estadocivil"
              name="estadocivil"
              value={funcionario.estadocivil}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione o estado civil</option>
              <option value="SOLTEIRO">Solteiro</option>
              <option value="CASADO">Casado</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Enviando...' : (funcionarioProp ? 'Atualizar' : 'Cadastrar')}
        </button>
      </form>
      <br></br>
      <button onClick={() => window.location.reload()} className="btn btn-info" >
         Voltar
        </button>
    </div>
  );
}

export default CadastroFuncionario;
