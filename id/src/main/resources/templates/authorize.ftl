<html>
<head>
<link rel="stylesheet" href="../css/wro.css"/>
</head>
<body>
	<div class="container">
		<h2>Molimo potvrdite</h2>

		<p>
			Da li dozvoljavate aplikaciji "${authorizationRequest.clientId}" na adresi "${authorizationRequest.redirectUri}" 
			da pristupi vašim zaštićenim resursima 
			u opsegu ${authorizationRequest.scope?join(", ")}.
		</p>
		<form id="confirmationForm" name="confirmationForm"
			action="../oauth/authorize" method="post">
			<input name="user_oauth_approval" value="true" type="hidden" />
			<input type="hidden" id="csrf_token" name="${_csrf.parameterName}" value="${_csrf.token}"/>
			<input type="hidden" id="scope" name="scope.${authorizationRequest.scope?join(".")}" value="true"/>
			<button class="btn btn-primary" type="submit" name="authorize" value="Authorize">Dozvoljavam</button>
		</form>
		<form id="denyForm" name="confirmationForm"
			action="../oauth/authorize" method="post">
			<input name="user_oauth_approval" value="false" type="hidden" />
			<input type="hidden" id="csrf_token" name="${_csrf.parameterName}" value="${_csrf.token}"/>
			<button class="btn btn-primary" type="submit">Ne dozvoljavam</button>
		</form>
	</div>
	<script src="../js/wro.js"	type="text/javascript"></script>
</body>
</html>