package com.estabelecimento.CRUD_Funcionarios.services;

import com.estabelecimento.CRUD_Funcionarios.model.Funcionario;
import com.estabelecimento.CRUD_Funcionarios.repository.FuncionarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FuncionarioServices {

    @Autowired
    private final FuncionarioRepository funcionarioRepository;

    public Funcionario SaveFuncionario(Funcionario funcionario){
        return funcionarioRepository.save(funcionario);
    }
    public Funcionario UpdateFuncionario(Funcionario funcionario){
        return funcionarioRepository.save(funcionario);
    }
    public void DeleteFuncionario(Long cpf){
        funcionarioRepository.deleteById(cpf);
    }
    public Funcionario FindFuncionarioById(Long cpf){
        return funcionarioRepository.findById(cpf).orElse(null);
    }
    public List<Funcionario> ListFuncionarios(){
        return (List<Funcionario>) funcionarioRepository.findAll();
    }
}
