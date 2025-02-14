import chalk from "chalk";
//pour fastify
import fastify from "fastify";
import fastifyBcrypt from "fastify-bcrypt";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyJWT from "@fastify/jwt";
import { createServer } from "http"; // Import createServer from http
import { Server } from "socket.io"; // Import Server from socket.io
//routes
import { usersRoutes } from "./routes/users.js";
import { gamesRoutes } from "./routes/games.js";
//bdd
import { sequelize } from "./bdd.js";

//Test de la connexion
try {
	sequelize.authenticate();
	console.log(chalk.grey("Connecté à la base de données MySQL!"));
} catch (error) {
	console.error("Impossible de se connecter, erreur suivante :", error);
}

/**
 * API
 * avec fastify
 */
let blacklistedTokens = [];
const app = fastify();
const server = createServer(app); // Create an HTTP server
const io = new Server(server, { // Create a new Socket.IO server
	cors: {
		origin: "*",
		methods: ["GET", "POST"]
	}
});
//Ajout du plugin fastify-bcrypt pour le hash du mdp
await app
	.register(fastifyBcrypt, {
		saltWorkFactor: 12,
	})
	.register(cors, {
		origin: "*",
	})
	.register(fastifySwagger, {
		openapi: {
			openapi: "3.0.0",
			info: {
				title: "Documentation de l'API JDR LOTR",
				description:
					"API développée pour un exercice avec React avec Fastify et Sequelize",
				version: "0.1.0",
			},
		},
	})
	.register(fastifySwaggerUi, {
		routePrefix: "/documentation",
		theme: {
			title: "Docs - JDR LOTR API",
		},
		uiConfig: {
			docExpansion: "list",
			deepLinking: false,
		},
		uiHooks: {
			onRequest: function (request, reply, next) {
				next();
			},
			preHandler: function (request, reply, next) {
				next();
			},
		},
		staticCSP: true,
		transformStaticCSP: (header) => header,
		transformSpecification: (swaggerObject, request, reply) => {
			return swaggerObject;
		},
		transformSpecificationClone: true,
	})
	.register(fastifyJWT, {
		secret: "unanneaupourlesgouvernertous",
	});
/**********
 * Routes
 **********/
app.get("/", (request, reply) => {
	reply.send({ documentationURL: "http://localhost:3000/documentation" });
});
// Fonction pour décoder et vérifier le token
app.decorate("authenticate", async (request, reply) => {
	try {
		const token = request.headers["authorization"].split(" ")[1];

		// Vérifier si le token est dans la liste noire
		if (blacklistedTokens.includes(token)) {
			return reply
				.status(401)
				.send({ error: "Token invalide ou expiré" });
		}
		await request.jwtVerify();
	} catch (err) {
		reply.send(err);
	}
});
//gestion utilisateur
usersRoutes(app,blacklistedTokens);
//gestion des jeux
gamesRoutes(app, io);

/**********
 * Socket.IO
 **********/
io.on('connection', (socket) => {
	console.log('a user connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	// Add your custom socket event handlers here
	socket.on('createGame', (data) => {
		console.log('createGame event received:', data);
		// Handle create game logic here
	});

	socket.on('joinGame', (data) => {
		console.log('joinGame event received:', data);
		// Handle join game logic here
	});
});

/**********
 * START
 **********/
const start = async () => {
	try {
		await sequelize
			.sync({ alter: true })
			.then(() => {
				console.log(chalk.green("Base de données synchronisée."));
			})
			.catch((error) => {
				console.error(
					"Erreur de synchronisation de la base de données :",
					error
				);
			});
		await app.listen({ port: 3000 });
		server.listen(3001);
		console.log(
			"Serveur Fastify lancé sur " + chalk.blue("http://localhost:3000")
		);
		console.log(
			chalk.bgYellow(
				"Accéder à la documentation sur http://localhost:3000/documentation"
			)
		);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};
start();
