/*
 * This file is part of the auto1-oss/ai-tester-playground.
 *
 * (c) AUTO1 Group SE https://www.auto1-group.com
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import app from "./app.js";

const PORT = process.env.PORT || 23500;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});