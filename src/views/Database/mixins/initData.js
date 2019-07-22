import {
  repair,
  backup_export,
  optimize,clear,
  restore,
  restore_import,
  download,
  del_file} from '@/api/Dictionary'

export default {
  methods: {
    //修复数据表
    repair(data){
      return new Promise((resolve, reject) => {
        repair(data).then(res=>{
          if(res.status==200){
            resolve(res)
          }else{
            reject(res)
          }
        })
      })
    },
    //备份数据表
    backup_export(data){
      return new Promise((resolve, reject) => {
        backup_export(data).then(res=>{
          if(res.status==200){
            resolve(res)
          }else{
            reject(res)
          }
        })
      })
    },
    //优化数据表
    optimize(data){
      return new Promise((resolve, reject) => {
        optimize(data).then(res=>{
          if(res.status==200){
            resolve(res)
          }else{
            reject(res)
          }
        })
      })
    },
    //刷新数据表
    clear(data){
      return new Promise((resolve, reject) => {
        clear(data).then(res=>{
          if(res.status==200){
            resolve(res)
          }else{
            reject(res)
          }
        })
      })
    },
    //还原数据列表
    restore(){
      return new Promise((resolve, reject) => {
        restore().then(res=>{
          if(res.status==200){
            resolve(res)
          }else{
            reject(res)
          }
        })
      })
    },
    //还原导入
    restore_import(data){
      return new Promise((resolve, reject) => {
        restore_import(data).then(res=>{
          if(res.status==200){
            resolve(res)
          }else{
            reject(res)
          }
        })
      })
    },
    //备份文件下载
    download(data){
      return new Promise((resolve, reject) => {
        download(data).then(res=>{
          if(res.status==200){
            resolve(res)
          }else{
            reject(res)
          }
        })
      })
    },
    //删除备份文件
    del_file(data){
      return new Promise((resolve, reject) => {
        del_file(data).then(res=>{
          if(res.status==200){
            resolve(res)
          }else{
            reject(res)
          }
        })
      })
    },
  }
}
