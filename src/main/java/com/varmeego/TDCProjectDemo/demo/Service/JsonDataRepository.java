package com.varmeego.TDCProjectDemo.demo.Service;

import com.varmeego.TDCProjectDemo.demo.DataModel.JSONForm;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JsonDataRepository extends JpaRepository<JSONForm, Long> {

    @Query(value = "SELECT * FROM JSONForm WHERE data->>'name' = :name", nativeQuery = true)
    List<JSONForm> findByName(@Param("name") String name);


    @Query(value = "SELECT data->>'name' FROM JSONForm WHERE data->> 'formType' = :formType", nativeQuery = true)
    List<String> findNamesByFormType(@Param("formType") String formType);


    @Modifying
    @Transactional
    @Query(value = "UPDATE JSONForm SET data = jsonb_set(data, '{isDeployed}', 'false', false) WHERE data->>'formType' = :formType", nativeQuery = true)
    void setCompanyInformationFormsNotDeployed(@Param("formType") String formType);

    @Query(value = "SELECT * FROM JSONForm WHERE data->>'formType' = :formType AND (data->>'isDeployed')::boolean = true", nativeQuery = true)
    List<JSONForm> findDeployedFormByFormType(@Param("formType") String formType);

    @Modifying
    @Transactional
    @Query(value = "UPDATE JSONForm SET data = jsonb_set(data, '{isDeployed}', 'true', true) WHERE data->>'formType' = :formType and data->>'name' = :name", nativeQuery = true)
    void setCompanyInformationFormsDeployedByNameAndType(@Param("formType") String formType, @Param("name") String name);

}