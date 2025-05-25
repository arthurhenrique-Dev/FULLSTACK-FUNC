    package com.estabelecimento.CRUD_Funcionarios.repository;

    import com.estabelecimento.CRUD_Funcionarios.model.Funcionario;
    import jakarta.transaction.Transactional;
    import org.springframework.data.repository.CrudRepository;
    import org.springframework.stereotype.Repository;

    @Repository
    @Transactional
    public interface FuncionarioRepository extends CrudRepository<Funcionario, Long> {
    }
