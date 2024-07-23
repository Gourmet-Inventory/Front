import React, { useEffect, useState } from 'react';
import BarraPesquisa from '../../components/barraPesquisa/barraPesquisa';
import api from '../../api';
import axios from 'axios';
import ImgConfig from '../../components/imgConfig/ImgConfig';
import styles from './pagFornecedor.module.css';
import ModalCadastro from '../../components/modalCadastroForn/ModalCadastro';
import ModalVizualizar from '../../components/modalVizualizarForn/ModalVizualizarForn';
import { toast } from 'react-toastify';
import MenuLateral from '../../components/menuLateral/MenuLateral';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function PagFornecedor() {
  const [fornecedores, setFornecedores] = useState([]);
  const [openCadastro, setOpenCadastro] = useState(false);
  const [openVizualizar, setOpenVizualizar] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [viewData, setViewData] = useState({});

  const [nomeFornecedor, setNomeFornecedor] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [uf, setUf] = useState('');
  const [numeracaoLogradouro, setNumeracaoLogradouro] = useState('');
  const [telefone, setTelefone] = useState('');
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    recuperarFornecedores();
  }, []);

  const recuperarFornecedores = () => {
    api
      .get('/fornecedores', {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        console.log('Resposta da API:', response.data); // Adicione este log
        setFornecedores(response.data);
      })
      .catch(() => {
        // Adicione sua lógica de tratamento de erro aqui
      });
  };

  const handleExcluir = (idFornecedor) => {
   
    const confirmToast = () => {
      const onConfirm = () => {
          api.delete(`/fornecedores/${idFornecedor}`, {
              headers: { 'Authorization': `Bearer ${localStorage.token}` }
          }).then(() => {
              recuperarFornecedores();
              toast.dismiss();
              toast.success("Fornecedor excluído com sucesso!");
              setOpenVizualizar(false);
          }).catch(() => {
              toast.dismiss();
              toast.error("Erro ao excluir o fornecedor.");
          });
      };

      const onCancel = () => {
          toast.dismiss();
      };

      return (
          <div>
              Tem certeza de que deseja excluir este fornecedor?
              <div>
                  <button onClick={onConfirm} id={styles["excluirSim"]}>Sim</button>
                  <button onClick={onCancel} id={styles["excluirNao"]}>Não</button>
              </div>
          </div>
      );
  };

  toast(confirmToast, {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false
  });
      


  };

  const handleSave = () => {
    if (!nomeFornecedor || !cnpj || !cep || !numeracaoLogradouro || !telefone || !categoria) {
      return toast.error("Todos os campos são obrigatórios!");
    }

    const fornecedor = {
      nomeFornecedor,
      cnpj,
      cep,
      logradouro,
      complemento,
      bairro,
      localidade,
      uf,
      numeracaoLogradouro,
      telefone,
      categoria,
    };

    if (dataEdit.idFornecedor) {
      api
        .patch(`/fornecedores/${dataEdit.idFornecedor}`, fornecedor, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then(() => {
    
          recuperarFornecedores();
          setOpenCadastro(false);
        })
        .catch(() => {
   
        });
    } else {
      api
        .post('/fornecedores', fornecedor, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then(() => {
          toast.success("Fornecedor criado com sucesso");
          recuperarFornecedores();
          setOpenCadastro(false);
        })
        .catch(() => {
          toast.error("Erro ao criar fornecedor")
        });
    }
  };

  const handleCadastrar = () => {
    // Limpar os dados editados
    setDataEdit({});
    // Limpar os campos do formulário
    limparCampos();
    // Abrir o modal de cadastro
    setOpenCadastro(true);
  };

  const limparCampos = () => {
    setNomeFornecedor('');
    setCnpj('');
    setCep('');
    setLogradouro('');
    setComplemento('');
    setBairro('');
    setLocalidade('');
    setUf('');
    setNumeracaoLogradouro('');
    setTelefone('');
    setCategoria('');
  };

  const handleEdit = (fornecedor) => {
    setDataEdit(fornecedor);
    setNomeFornecedor(fornecedor.nomeFornecedor);
    setCnpj(fornecedor.cnpj);
    setCep(fornecedor.cep);
    setLogradouro(fornecedor.logradouro);
    setComplemento(fornecedor.complemento);
    setBairro(fornecedor.bairro);
    setLocalidade(fornecedor.localidade);
    setUf(fornecedor.uf);
    setNumeracaoLogradouro(fornecedor.numeracaoLogradouro);
    setTelefone(fornecedor.telefone);
    setCategoria(fornecedor.categoria);
    setOpenCadastro(true);
    setOpenVizualizar(false);
  };

  const handleView = (fornecedor) => {
    setViewData(fornecedor);
    setOpenVizualizar(true);
  };

  const handleCepChange = async (e) => {
    const novoCep = e.target.value;
    setCep(novoCep);

    if (novoCep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${novoCep}/json/`);
        const data = response.data;
        setLogradouro(data.logradouro || '');
        setComplemento(data.complemento || '');
        setBairro(data.bairro || '');
        setLocalidade(data.localidade || '');
        setUf(data.uf || '');
      } catch (error) {
        console.error('Erro ao buscar o CEP: ', error);
      }
    }
  };

  return (
    <>
      <MenuLateral />
      <div className={styles['body']}>
        <div className={styles['cabecalho']}>
          <BarraPesquisa tituloPag={'Fornecedor'} />
          <button onClick={handleCadastrar}>Cadastrar Fornecedor</button>
        </div>
        <ImgConfig />
        <div className={styles['form']}>
          <div className={styles['tituloForm']}>
            <span>Nome</span>
            <span>Categoria</span>
            <span>Telefone</span>
          </div>
          <div className={styles['tabelaForn']}>
            <table>
            
              <tbody>
                {Array.isArray(fornecedores) &&
                  fornecedores.map((fornecedor) => (
                    <tr key={fornecedor.idFornecedor} onClick={() => handleView(fornecedor)}>
                      <td>{fornecedor.nomeFornecedor}</td>
                      <td>{fornecedor.categoria}</td>
                      <td>{fornecedor.telefone}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {openCadastro && (
          <ModalCadastro isOpen={openCadastro} setModalOpen={() => setOpenCadastro(!openCadastro)}>
            <div className={styles['cadastro']}>
              <h3>{dataEdit.idFornecedor ? 'Editar Fornecedor' : 'Cadastrar Fornecedor'}</h3>
              <div className={styles['inputCadastro']}>
                <div className={styles['input']}>
                  <span>Nome</span>
                  <input
                    type='text'
                    value={nomeFornecedor}
                    onChange={(e) => setNomeFornecedor(e.target.value)}
                    placeholder='Fornecedor X'
                  />
                </div>
                <div className={styles['input']}>
                  <span>CNPJ</span>
                  <input
                    type='text'
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    placeholder='XXXXXXXX0001XX'
                  />
                </div>
                <div className={styles['input']}>
                  <span>CEP</span>
                  <input type='text' value={cep} onChange={handleCepChange} placeholder='00000000' />
                </div>
                <div className={styles['input']}>
                  <span>Logradouro</span>
                  <input
                    type='text'
                    value={logradouro}
                    onChange={(e) => setLogradouro(e.target.value)}
                    placeholder='Rua X'
                  />
                </div>

                <div className={styles['input']}>
                  <span>Complemento</span>
                  <input
                    type='text'
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                    placeholder='Opcional'
                  />
                </div>
                <div className={styles['input']}>
                  <span>Bairro</span>
                  <input type='text' value={bairro} onChange={(e) => setBairro(e.target.value)} placeholder='Bairro X' />
                </div>
                <div className={styles['input']}>
                  <span>Localidade</span>
                  <input
                    type='text'
                    value={localidade}
                    onChange={(e) => setLocalidade(e.target.value)}
                    placeholder='São Paulo'
                  />
                </div>
                <div className={styles['input']}>
                  <span>UF</span>
                  <input type='text' value={uf} onChange={(e) => setUf(e.target.value)} placeholder='SP' />
                </div>

                <div className={styles['input']}>
                  <span>Numeração</span>
                  <input
                    type='text'
                    value={numeracaoLogradouro}
                    onChange={(e) => setNumeracaoLogradouro(e.target.value)}
                    placeholder='10'
                  />
                </div>
                <div className={styles['input']}>
                  <span>Telefone</span>
                  <input
                    type='text'
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder='00000000000'
                  />
                </div>
                <div className={styles['input']}>
                  <span>Categoria</span>
                  <input
                    type='text'
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    placeholder='Laticínios'
                  />
                </div>
              </div>
              <button onClick={handleSave}>{dataEdit.idFornecedor ? 'Salvar' : 'Cadastrar'}</button>
            </div>
          </ModalCadastro>
        )}

        {openVizualizar && (
          <ModalVizualizar
            isOpen={openVizualizar}
            setModalOpen={() => setOpenVizualizar(!openVizualizar)}
            titulo={`Fornecedor ${viewData.nomeFornecedor}`}
          >
            <div className={styles['formVizualizar']}>
              <div className={styles['dadosForn']}>
                <span>
                  <span id={styles['tituloModal']}>CNPJ:</span> {viewData.cnpj}
                </span>
                <span>
                  <span id={styles['tituloModal']}>CEP:</span> {viewData.cep}
                </span>
                <span>
                  <span id={styles['tituloModal']}>Logradouro:</span> {viewData.logradouro}
                </span>
                <span>
                  <span id={styles['tituloModal']}>Complemento:</span> {viewData.complemento}
                </span>
                <span>
                  <span id={styles['tituloModal']}>Bairro:</span> {viewData.bairro}
                </span>
                <span>
                  <span id={styles['tituloModal']}>Localidade:</span> {viewData.localidade}
                </span>
                <span>
                  <span id={styles['tituloModal']}>UF:</span> {viewData.uf}
                </span>
                <span>
                  <span id={styles['tituloModal']}>Numeração:</span> {viewData.numeracaoLogradouro} 
                </span>
                <span>
                  <span id={styles['tituloModal']}>Telefone:</span> {viewData.telefone}
                </span>
                <span>
                  <span id={styles['tituloModal']}>Categoria:</span> {viewData.categoria}
                </span>
              </div>
              <div className={styles['botao']}>
                <button id={styles['editar']} onClick={() => handleEdit(viewData)}>
                  Editar
                </button>
                <button id={styles['excluir']} onClick={() => handleExcluir(viewData.idFornecedor)}>
                  Excluir
                </button>
              </div>
            </div>
          </ModalVizualizar>
        )}

        <ToastContainer />
      </div>
    </>
  );
}

export default PagFornecedor;