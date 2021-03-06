//基础目录
UE.FormDesignBaseUrl = 'formdesign';
//配置扩展的控件
var extPlugins=[{
            	 name:'extdig-textbox',
            	 text:'文本框',
            	 tag:'input',
            	 popHeight:320,
            	 popWidth:640
             },
             {
            	 name:'extdig-textarea',
            	 text:'多行文本框',
            	 tag:'textarea',
            	 popHeight:320,
            	 popWidth:640
             },
             {
            	 name:'extdig-checkbox',
            	 text:'复选框',
            	 tag:'input',
            	 popHeight:320,
            	 popWidth:640
             },
             {
            	 name:'extdig-radio',
            	 text:'单选按钮列表',
            	 tag:'input',
            	 popHeight:320,
            	 popWidth:640
             },
             {
            	 name:'extdig-select',
            	 text:'下拉列表',
            	 tag:'select',
            	 popHeight:320,
            	 popWidth:640
             },
             {
            	 name:'extdig-upload',
            	 text:'附件上传',
            	 tag:'input',
            	 popHeight:320,
            	 popWidth:640
             },
             {
            	 name:'extdig-grid',
            	 text:'明细表格',
            	 tag:'div',
            	 popHeight:460,
            	 popWidth:840
             },
             {
            	 name:'extdig-hidden',
            	 text:'隐藏域',
            	 tag:'input',
            	 popHeight:250,
            	 popWidth:640 
             },
              {
                  	 name:'extdig-save',
                  	 text:'保存',
                  	 tag:'a',
                  	 popHeight:320,
                  	 popWidth:650
                }
             ];

//注册所有控件
for(var i=0;i<extPlugins.length;i++){
	registerPlugin(i);	
}

//注册插件
function registerPlugin(index){
	UE.plugins[extPlugins[index].name] = function () {
		
		var pluginName=extPlugins[index].name;
		var pluginText=extPlugins[index].text;
		var pluginTag=extPlugins[index].tag;
		var popWidth=extPlugins[index].popWidth;
		var popHeight=extPlugins[index].popHeight;
		
		var me = this,thePlugins = pluginName;
		me.commands[thePlugins] = {
			//两参数可不配置,ModelId为外部配置的业务实体的Id
			execCommand:function (pluginName) {
				//var modelId=getModelId();
				var modelId="";
				var dialog = new UE.ui.Dialog({
					iframeUrl:this.options.UEDITOR_HOME_URL + UE.FormDesignBaseUrl+'/dialog/'+pluginName+'.jsp?modelId='+modelId,
					name:thePlugins,
					editor:this,
					title: pluginText+'属性设置',
					cssRules:"width:"+popWidth+"px;height:"+popHeight+"px;",
					buttons:[
					{
						className:'edui-okbutton',
						label:'确定',
						onclick:function () {
							dialog.close(true);
						}
					},
					{
						className:'edui-cancelbutton',
						label:'取消',
						onclick:function () {
							dialog.close(false);
						}
					}]
				});
				dialog.render();
				dialog.open();
			}
		};
		
		var popup = new baidu.editor.ui.Popup( {
			editor:this,
			content: '',
			className: 'edui-bubble',
			_edittext: function () {
				  baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
				  me.execCommand(thePlugins);
				  this.hide();
			},
			_delete:function(){
				if( window.confirm('确认删除该控件吗？') ) {
					baidu.editor.dom.domUtils.remove(this.anchorEl,false);
				}
				this.hide();
			}
		});
		
		popup.render();
		me.addListener( 'mouseover', function( t, evt ) {
			evt = evt || window.event;
			var el = evt.target || evt.srcElement;
	        var mPlugins = el.getAttribute('plugins');
	        if(mPlugins==null) return;
	        
			if ( el.tagName.toLowerCase()==pluginTag && mPlugins==thePlugins) {
				var html = popup.formatHtml(
					'<nobr>'+pluginText+': <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>' );
				if ( html ) {
					popup.getDom( 'content' ).innerHTML = html;
					popup.anchorEl = el;
					popup.showAnchor( popup.anchorEl );
				} else {
					//popup.hide();
				}
				setTimeout(function(){
					popup.hide();
				},3000);
			}
		});
		/*
		me.addListener('mouseout',function(t,evt){
			
		});*/
	};
}



