package com.saurabh.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saurabh.model.Deal;
import com.saurabh.response.ApiResponse;
import com.saurabh.service.DealService;

@RestController
@RequestMapping("/admin/deals")
public class DealController {
	
	private final DealService dealService;

	public DealController(DealService dealService) {
		super();
		this.dealService = dealService;
	}
	
	@PostMapping
	public ResponseEntity<Deal> createDeals(@RequestBody Deal deal){
		Deal createDeal = dealService.createDeal(deal);
		return ResponseEntity.ok(createDeal);
		
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<Deal>updateDeal(@PathVariable Long id,@RequestBody Deal deal) throws Exception{
		Deal updatedDeal =dealService.updateDeal(deal, id);
		return ResponseEntity.ok(updatedDeal);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse>deleteDeal(@PathVariable Long id) throws Exception{
		dealService.deleteDeal(id);
		ApiResponse apiResponse = new ApiResponse();
		apiResponse.setMessage("Deal Deleted");
		
		return ResponseEntity.ok(apiResponse);
	}
	

}
