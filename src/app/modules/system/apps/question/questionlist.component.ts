import { Component, OnInit,Inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { DialogService } from "../../../common/component/dialog/dialog.service"

@Component({
    selector: 'yhu-quesiton-list',
    templateUrl: './questionlist.html',
    styleUrls: ['./questionlist.less']
})
export class QuestionListComponent implements OnInit {

    loading = false;
    data: any[] = [];
    keyword: string;
    status: string;

    searchStatus="0";

    saveName = "";
    modalVisible = false;
    modalTitle: string;
    resource:any;
    currEditId = null;

    constructor(
        public msg: NzMessageService,
        @Inject("DataApiService") private dataApiService,
        public dialogService:DialogService

    ) { }

    ngOnInit() {
        this.loadData()
    }


    loadData(){
        let params = {
          sort:"-_id",
        }
        if(this.searchStatus!="0"){
            params["enabled_status"] = parseInt(this.searchStatus)
        }
         this.resource = this.dataApiService.get("question.questionDataApi").resource
         this.resource.get(params).map(res=>res.json().data).subscribe((res)=>{
             res.unshift(null)
             this.data = res
         })
    }


    /**
     * 输入查询
     */
    search(_status) {
        this.loadData()
    }

    /**
     * 新增
     */
    add() {
        this.modalVisible = true;
        this.modalTitle = "新增问卷";
    }

    /**
     * 编辑
     */
    edit(item) {
        this.currEditId = item._id;
        this.modalVisible = true;
        this.saveName = item.name
        this.modalTitle = "编辑问卷";
    }

    /**
     * 删除
     */
    delete(item) {
        this.dialogService.confirm("确认删除吗?").then((res) => {
          this.resource.delete(item._id).subscribe((res) => {
            this.msg.success('删除成功');
            this.loadData()
          })
        }, (reason) => {

        })
    }

    /**
     * 复制
     */
    copy(item) {
        let postData = {name:item.name,enabled_status:item.enabled_status}
        this.resource.post(postData).subscribe(()=>{
            this.loadData()
        })
    }

    /**
     * 启用/禁用
     */
    setStatus() {

    }

     /**
     * 关闭弹出窗口
     */
    closeModal(){
        this.modalVisible = false;
        this.currEditId = null
    }

    /**
     * 保存问卷信息|新增or编辑
     */
    saveFormData(){
        if(this.saveName == ""){
            this.msg.error("名称不可为空")
            return
        }
        if(this.currEditId == null){
            let postData = {name:this.saveName,enabled_status:1}
            this.resource.post(postData).subscribe(()=>{
                this.loadData()
                this.msg.info("创建成功")
                this.modalVisible = false;
                this.saveName = "";
            })
        }
        else{
            let postData = {name:this.saveName}
            this.resource.put(this.currEditId,postData).subscribe((res)=>{
                this.loadData()
                this.msg.info("修改成功")
                this.modalVisible = false;
                this.saveName = "";
           })

        }


    }
}
