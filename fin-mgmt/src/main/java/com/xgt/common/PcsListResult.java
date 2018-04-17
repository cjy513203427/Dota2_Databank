package com.xgt.common;

import com.xgt.exception.EnumPcsService;

/**
 * This is common used for API results.
 * 
 */
public class PcsListResult extends PcsResult {
    // 总记录数
   private int total;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public PcsListResult() {
        super.setCode(EnumPcsService.SUCCESS.getCode());
        super.setMessage(EnumPcsService.SUCCESS.getDesc());
    }
    public PcsListResult(EnumPcsService error) {
        super.setCode(error.getCode());
        super.setMessage(error.getDesc());
    }
}
