const apiRouter = require('express').Router();
const issuesService = require('../services/issuesService');
const historyService = require('../services/historyService');

// apiRouter.get('/api/issues', async (req, res) => {
//   try {
//     res.status(200).json(await issuesService.getIssues());
//   } catch (e) {
//     res.status(500).json({ e });
//   }
// });

apiRouter.get('/api/history', (req, res) => {
  historyService.getHistory()
    .then(result => res.status(200).json({
      result,
    }))
    .catch(error => res.status(500).json({
      error,
    }));
});

apiRouter.get('/api/issues', (req, res) => {
  issuesService.getIssues()
    .then(result => res.status(200).json({
      result,
    }))
    .catch(error => res.status(500).json({
      error,
    }));
});

apiRouter.get('/api/issueTypes', (req, res) => {
  issuesService.getTypes()
    .then(result => res.status(200).json({
      result,
    }))
    .catch(error => res.status(500).json({
      error,
    }));
});

apiRouter.get('/api/issueStatus', (req, res) => {
  issuesService.getStatus()
    .then(result => res.status(200).json({
      result,
    }))
    .catch(error => res.status(500).json({
      error,
    }));
});

apiRouter.post('/api/issue', (req, res) => {
  issuesService.insertIssue(req.body)
    .then(() => issuesService.getIssues())
    .then(result => res.json({
      result,
    }))
    .catch(error => res.status(500).json({
      error,
    }));
});

apiRouter.put('/api/issueEdit', (req, res) => {
  issuesService.updateIssue(req.body)
    .then(() => issuesService.getIssues())
    .then(result => res.status(200).json({
      result,
    }))
    .catch(error => res.status(500).json({
      error,
    }));
});

apiRouter.delete('/api/issueDelete', (req, res) => {
  issuesService.deleteIssue(req.query.id)
    .then(() => issuesService.getIssues())
    .then(result => res.status(200).json({
      result,
    }))
    .catch(error => res.status(500).json({
      error,
    }));
});

module.exports = apiRouter;
