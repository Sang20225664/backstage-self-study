const express = require('express');
const cors = require('cors');
const Docker = require('dockerode');
const path = require('path');

const app = express();
const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Docker API is running',
        timestamp: new Date().toISOString()
    });
});

// GET /api/containers - List all containers
app.get('/api/containers', async (req, res) => {
    try {
        const containers = await docker.listContainers({ all: true }); // ~ ps -a

        // Format container data
        const formattedContainers = containers.map(container => ({
            id: container.Id.substring(0, 12),
            name: container.Names[0].replace('/', ''),
            image: container.Image,
            status: container.State,
            state: container.Status,
            ports: container.Ports.map(port => ({
                private: port.PrivatePort,
                public: port.PublicPort,
                type: port.Type
            })),
            created: new Date(container.Created * 1000).toISOString()
        }));

        res.json({
            success: true,
            count: formattedContainers.length,
            containers: formattedContainers
        });
    } catch (error) {
        console.error('Error listing containers:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to list containers',
            message: error.message
        });
    }
});

// GET /api/containers/:name - Get container details
app.get('/api/containers/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const container = docker.getContainer(name);

        const info = await container.inspect();

        res.json({
            success: true,
            container: {
                id: info.Id.substring(0, 12),
                name: info.Name.replace('/', ''),
                image: info.Config.Image,
                status: info.State.Status,
                running: info.State.Running,
                created: info.Created,
                platform: info.Platform,
                ports: info.NetworkSettings.Ports,
                environment: info.Config.Env,
                mounts: info.Mounts.map(mount => ({
                    type: mount.Type,
                    source: mount.Source,
                    destination: mount.Destination
                }))
            }
        });
    } catch (error) {
        console.error(`Error getting container ${req.params.name}:`, error);
        res.status(404).json({
            success: false,
            error: 'Container not found',
            message: error.message
        });
    }
});

// POST /api/containers/:name/start - Start a container
app.post('/api/containers/:name/start', async (req, res) => {
    try {
        const { name } = req.params;
        const container = docker.getContainer(name);

        // Check current state
        const info = await container.inspect();

        if (info.State.Running) {
            return res.status(400).json({
                success: false,
                error: 'Container is already running',
                container: {
                    name: info.Name.replace('/', ''),
                    status: info.State.Status
                }
            });
        }

        // Start the container
        await container.start();

        // Get updated info
        const updatedInfo = await container.inspect();

        res.json({
            success: true,
            message: 'Container started successfully',
            container: {
                id: updatedInfo.Id.substring(0, 12),
                name: updatedInfo.Name.replace('/', ''),
                status: updatedInfo.State.Status,
                running: updatedInfo.State.Running,
                startedAt: updatedInfo.State.StartedAt
            }
        });
    } catch (error) {
        console.error(`Error starting container ${req.params.name}:`, error);
        res.status(500).json({
            success: false,
            error: 'Failed to start container',
            message: error.message
        });
    }
});

// POST /api/containers/:name/stop - Stop a container
app.post('/api/containers/:name/stop', async (req, res) => {
    try {
        const { name } = req.params;
        const container = docker.getContainer(name);

        // Check current state
        const info = await container.inspect();

        if (!info.State.Running) {
            return res.status(400).json({
                success: false,
                error: 'Container is not running',
                container: {
                    name: info.Name.replace('/', ''),
                    status: info.State.Status
                }
            });
        }

        // Stop the container
        await container.stop();

        // Get updated info
        const updatedInfo = await container.inspect();

        res.json({
            success: true,
            message: 'Container stopped successfully',
            container: {
                id: updatedInfo.Id.substring(0, 12),
                name: updatedInfo.Name.replace('/', ''),
                status: updatedInfo.State.Status,
                running: updatedInfo.State.Running,
                finishedAt: updatedInfo.State.FinishedAt
            }
        });
    } catch (error) {
        console.error(`Error stopping container ${req.params.name}:`, error);
        res.status(500).json({
            success: false,
            error: 'Failed to stop container',
            message: error.message
        });
    }
});

// POST /api/containers/:name/restart - Restart a container
app.post('/api/containers/:name/restart', async (req, res) => {
    try {
        const { name } = req.params;
        const container = docker.getContainer(name);

        await container.restart();

        const updatedInfo = await container.inspect();

        res.json({
            success: true,
            message: 'Container restarted successfully',
            container: {
                id: updatedInfo.Id.substring(0, 12),
                name: updatedInfo.Name.replace('/', ''),
                status: updatedInfo.State.Status,
                running: updatedInfo.State.Running,
                startedAt: updatedInfo.State.StartedAt
            }
        });
    } catch (error) {
        console.error(`Error restarting container ${req.params.name}:`, error);
        res.status(500).json({
            success: false,
            error: 'Failed to restart container',
            message: error.message
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        availableEndpoints: [
            'GET /health',
            'GET /api/containers',
            'GET /api/containers/:name',
            'POST /api/containers/:name/start',
            'POST /api/containers/:name/stop',
            'POST /api/containers/:name/restart'
        ]
    });
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Docker API Server running on http://localhost:${PORT}`);
    console.log(`🌐 Web UI available at http://localhost:${PORT}`);
    console.log(`📋 API endpoints:`);
    console.log(`   GET  /health`);
    console.log(`   GET  /api/containers`);
    console.log(`   GET  /api/containers/:name`);
    console.log(`   POST /api/containers/:name/start`);
    console.log(`   POST /api/containers/:name/stop`);
    console.log(`   POST /api/containers/:name/restart`);
});
