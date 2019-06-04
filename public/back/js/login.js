$(function () {
    $('#form').bootstrapValidator({
        feedbackIcons:{
            valid:'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating:'glyphicon glyphicon-refresh'
        },
        fields:{
            username:{
               validators:{
                   notEmpty:{
                       message:'用户名不能为空'
                   },
                   stringLength:{
                       min:2,
                       max:6,
                       message:'用户名必须在2-6位'
                   },
                   callback:{
                       message:'用户名不存储'
                   }
               }
            },
            password:{
               validators: {
                   notEmpty:{
                      message: '密码不能为空'
                   },
                   stringLength: {
                       min:6,
                       max:12,
                       message:'密码必须6-12位'
                   },
                   callback:{
                       message:'密码错误'
                   }
               }
            }
        }
    });

    $('#form').on("success.form.bv", function( e ) {
        // 阻止默认的表单提交
        e.preventDefault();

        //console.log( "校验成功后的 表单提交 被阻止了" );

        // 通过 ajax 进行提交
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $('#form').serialize(),
            dataType: "json",
            success: function( info ) {
                console.log( info );
                if ( info.success ) {
                    // 登录成功, 跳转到首页
                    location.href = "index.html";
                }

                if ( info.error === 1000 ) {
                    //alert("当前用户名不存在");
                    // updateStatus 更新校验状态
                    // 1. 字段名称
                    // 2. 校验状态  VALID, INVALID   NOT_VALIDATED未校验的,  VALIDATING校验中的
                    // 3. 校验规则, 用于指定提示文本
                    $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }

                if ( info.error === 1001 ) {
                    //alert("密码错误");

                    $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }
            }
        })

    });

    $('[type="reset"]').click(function () {
        $('#form').data('bootstrapValidator').resetForm();
    })

});