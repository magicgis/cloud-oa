<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <title>机构管理</title>
    <link rel="shortcut icon" href="favicon.ico">
    <link href="${ctx}/scripts/hplus/css/bootstrap.min.css" rel="stylesheet">
    <link href="${ctx}/scripts/hplus/css/font-awesome.min93e3.css?v=4.4.0" rel="stylesheet">
    <link href="${ctx}/scripts/hplus/css/animate.min.css" rel="stylesheet">
    <link href="${ctx}/scripts/hplus/css/style.min.css" rel="stylesheet">
    
    <script type="text/javascript" src="${ctx}/scripts/hplus/js/jquery.min.js"></script>
    <script type="text/javascript" src="${ctx}/scripts/hplus/js/bootstrap.min.js"></script>
    <script>
		function openOrg() {
			var index = parent.layer.open({
				  type: 2,
			      title: '部门选择',
			      area: ['650px', '400px'],
			      content: '${ctx}/security/org?lookup=1'
				});
			parent.digCallBack = function(obj){
				document.getElementById("parentOrgId").value=obj.id;
				document.getElementById("parentOrgName").value=obj.name;
				parent.layer.close(index);	
			};
		}
		
	</script>
</head>
	<body>
		<form id="inputForm" action="${ctx }/security/org/update" method="post">
			<input type="hidden" name="id" id="id" value="${id }"/>
		
		<table  class="table table-bordered" style="width: 90%;" align="center" >
		<caption style="text-align: center;"><h2>部门管理</h2></caption>
				<tr>
					<td style="text-align: right;">
						<span>部门名称：</span>
					</td>
					<td>
						<div class="col-sm-6">
						<input type="text" class="form-control" id="name" name="name"
							value="${org.name }" />
						</div>	
					</td>
				</tr>
				<tr>
					<td style="text-align: right;">
						<span>上级部门：</span>
					</td>
					<td>
						<div class="col-sm-6">
						<input type="hidden" id="parentOrgId" name="parentOrgId" value="${org.parentOrg.id }">
						<input type="text" id="parentOrgName" readonly="readonly" name="parentOrgName" class="form-control" value="${org.parentOrg.name }">
						<input type='button' class="btn btn-sm btn-primary" value='上级部门' id="selectOrgBtn" onclick="openOrg()"/>
						</div>
					</td>
				</tr>
				<tr>
					<td style="text-align: right;">
						<span>部门描述：</span>
					</td>
					<td>
						<div class="col-sm-6">
						<textarea class="form-control" id="description" name="description">${org.description }</textarea>
						</div>	
					</td>
				</tr>
			</table>
			<table align="center" border="0" cellpadding="0"
				cellspacing="0">
				<tr align="left">
					<td colspan="1">
						<input type="submit" class="btn btn-sm btn-primary" name="submit" value="提交">
						&nbsp;&nbsp;
						<input type="button" class="btn btn-sm btn-primary" name="reback" value="返回"
							onclick="history.back()">
					</td>
				</tr>
			</table>
		</form>
	</body>
</html>
