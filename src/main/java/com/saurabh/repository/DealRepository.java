package com.saurabh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saurabh.model.Deal;

public interface DealRepository extends JpaRepository<Deal, Long> {

}
