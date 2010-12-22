/*
* Licensed to the Apache Software Foundation (ASF) under one or more
* contributor license agreements.  See the NOTICE file distributed with
* this work for additional information regarding copyright ownership.
* The ASF licenses this file to You under the Apache License, Version 2.0
* (the "License"); you may not use this file except in compliance with
* the License.  You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* $Id: file 64488 2006-03-10 17:32:09Z paulo $
*/

mindplot.commands.RemoveIconFromTopicCommand = mindplot.Command.extend(
{
    initialize: function(topicId, iconModel)
    {
        core.assert(topicId, 'topicId can not be null');
        core.assert(iconModel, 'iconId can not be null');
        this._selectedObjectsIds = topicId;
        this._iconModel = iconModel;
    },
    execute: function(commandContext)
    {
        var topic = commandContext.findTopics(this._selectedObjectsIds)[0];
        var updated = function() {
            topic.removeIcon(this._iconModel);
            topic.updateNode();
        }.bind(this);
        updated.delay(0);
    },
    undoExecute: function(commandContext)
    {
        var topic = commandContext.findTopics(this._selectedObjectsIds)[0];
        var updated = function() {
            var iconType = this._iconModel.getIconType();
            var iconImg = topic.addIcon(iconType, commandContext._designer);
            this._iconModel = iconImg.getModel();
            topic.updateNode();
        }.bind(this);
        updated.delay(0);
    }
});