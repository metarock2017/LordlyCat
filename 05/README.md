# 文件图片上传

* base64
* 预览
* 断点续传
* 手动暂停／继续
* 数据库存储

## 笔记

* 在数据库存储数据时，使用了mysql 的 concat() 函数，此函数合并字符串🈶️最大长度限制，默认1024.可通过命令

  ```
  set global max_allowed_packet = 
  ```

  修改默认值，可修改的最大值为10^20-1（亲测）