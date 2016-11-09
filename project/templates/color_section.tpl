<h3>颜色</h3>
<section class="color_section">
	<%
		_.each(data, function(n, i){
	%>
    <div class="color_block">
        <p class="color_circle <%= n["name"] %>">@<%= n["name"] %></p>
        <p class="color_text">色值：<%= n["color"] %></p>
    </div>
    <%
    	})
    %>
</section>